import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { productSchema } from '@/models/Schema';
import {
  DeleteCategoryValidation,
  productEditValidate,
  productValidate,
} from '@/validations/GuestbookValidation';

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const json: any = Object.fromEntries(formData.entries());

  const parse = productEditValidate.safeParse({
    ...json,
    category_id: +json.category_id,
  });

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    if (parse.data.id) {
      await db
        .update(productSchema)
        .set({
          ...parse.data,
          updatedAt: sql`(strftime('%s', 'now'))`,
        })
        .where(eq(productSchema.id, parse.data.id))
        .run();

      logger.info('A product entry has been updated');

      return NextResponse.json({});
    }
    const product = await db
      .insert(productSchema)
      .values(parse.data)
      .returning();

    logger.info('A new product has been created');

    return NextResponse.json({
      id: product[0]?.id,
    });
  } catch (error) {
    logger.error(error, 'An error occurred while creating a product');

    return NextResponse.json({}, { status: 500 });
  }
};

export const GET = async (request: Request) => {
  // get detail
  const id: any = request.url.split('=')[1];
  if (id) {
    const product = await db
      .select()
      .from(productSchema)
      .where(eq(productSchema.id, id))
      .get();

    if (!product) {
      return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json(product);
  }

  const product = await db.select().from(productSchema).all();

  if (!product) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json(product);
};

export const PUT = async (request: Request) => {
  const formData = await request.formData();
  const json: any = Object.fromEntries(formData.entries());

  const parse: any = productValidate.safeParse({
    ...json,
    category_id: +json.category_id,
  });
  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    await db
      .update(productSchema)
      .set({
        ...parse.data,
        updatedAt: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(productSchema.id, parse.data.id))
      .run();

    logger.info('A product entry has been updated');

    return NextResponse.json({});
  } catch (error) {
    logger.error(error, 'An error occurred while updating a product');

    return NextResponse.json({}, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  const json = await request.json();
  const parse = DeleteCategoryValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    await db
      .delete(productSchema)
      .where(eq(productSchema.id, parse.data.id))
      .run();

    logger.info('A category entry has been deleted');

    return NextResponse.json({});
  } catch (error) {
    logger.error(error, 'An error occurred while deleting a category');

    return NextResponse.json({}, { status: 500 });
  }
};

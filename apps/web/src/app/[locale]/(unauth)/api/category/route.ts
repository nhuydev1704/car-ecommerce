import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { categorySchema } from '@/models/Schema';
import {
  categoryValidate,
  DeleteCategoryValidation,
  EditCategoryValidation,
} from '@/validations/GuestbookValidation';

export const POST = async (request: Request) => {
  const json = await request.json();
  const parse = categoryValidate.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    const category = await db
      .insert(categorySchema)
      .values(parse.data)
      .returning();

    logger.info('A new category has been created');

    return NextResponse.json({
      id: category[0]?.id,
    });
  } catch (error) {
    logger.error(error, 'An error occurred while creating a category');

    return NextResponse.json({}, { status: 500 });
  }
};

export const GET = async (request: Request) => {
  console.log('🚀 ~ GET ~ parse:', request.url);

  // get detail
  const id: any = request.url.split('=')[1];
  if (id) {
    const category = await db
      .select()
      .from(categorySchema)
      .where(eq(categorySchema.id, id))
      .get();

    if (!category) {
      return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json(category);
  }

  const category = await db.select().from(categorySchema).all();

  if (!category) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json(category);
};

export const PUT = async (request: Request) => {
  const json = await request.json();
  const parse = EditCategoryValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    await db
      .update(categorySchema)
      .set({
        ...parse.data,
        updatedAt: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(categorySchema.id, parse.data.id))
      .run();

    logger.info('A category entry has been updated');

    return NextResponse.json({});
  } catch (error) {
    logger.error(error, 'An error occurred while updating a category');

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
      .delete(categorySchema)
      .where(eq(categorySchema.id, parse.data.id))
      .run();

    logger.info('A category entry has been deleted');

    return NextResponse.json({});
  } catch (error) {
    logger.error(error, 'An error occurred while deleting a category');

    return NextResponse.json({}, { status: 500 });
  }
};

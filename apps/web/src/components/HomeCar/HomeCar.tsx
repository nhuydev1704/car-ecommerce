'use client';

import {
  Environment,
  Loader,
  OrbitControls,
  useProgress,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import React, { Suspense, useMemo } from 'react';

import Lamborghini from './Models/LamborghiniAventadorJ';

function HomeCar() {
  // ts-ignore
  const cars: any = useMemo(
    () => ({
      'Lamborghini Aventador J': {
        Model: Lamborghini,
        interior: '#000000',
        exterior: '#9a9898',
      },
    }),
    [],
  );

  const { progress } = useProgress();

  return (
    <div className="h-[60vh]">
      <Canvas camera={{ position: [0, 0, 8] }} shadows frameloop="demand">
        <Suspense fallback={null}>
          {/* {models.map((name) => { */}

          <Lamborghini
            key="Lamborghini Aventador J"
            exterior={cars['Lamborghini Aventador J'].exterior}
            interior={cars['Lamborghini Aventador J'].interior}
            visible
          />
          {/* );
          })} */}
        </Suspense>
        <Environment background files="venice_sunset_1k.hdr" blur={0.5} />
        {/* {stats ? <Stats /> : undefined} */}
        <OrbitControls
          maxPolarAngle={(7 * Math.PI) / 18}
          autoRotate
          minDistance={2}
          maxDistance={15}
        />
      </Canvas>
      <Loader />
      <Leva hidden={progress !== 100} />
    </div>
  );
}

export default React.memo(HomeCar);

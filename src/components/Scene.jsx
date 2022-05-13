import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import { types } from '../lib/constans';

const Earth = ({ onClick }) => {
  const ref = useRef();
  const img = useTexture('/pt.jpeg');

  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[0, 0, 0]} onClick={onClick}>
      <sphereGeometry attach='geometry' args={[1, 32, 32]} />
      <meshStandardMaterial attach='material' metalness={0} roughness={0} side={2} map={img} />
    </mesh>
  );
};

const Pole = ({ onClick, rotation, args }) => {
  const ref = useRef();

  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={rotation} onClick={onClick}>
      <sphereGeometry attach='geometry' args={args} />
      <meshStandardMaterial
        attach='material'
        metalness={0}
        roughness={0}
        side={2}
        color='red'
        transparent={true}
        opacity={0}
      />
    </mesh>
  );
};

const Space = ({ ...props }) => {
  const ref = useRef();

  const img = useTexture('/space.jpeg');

  return (
    <mesh {...props} ref={ref} scale={400} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach='geometry' args={[1, 32, 32]} />
      <meshStandardMaterial attach='material' metalness={0} roughness={0} side={2} map={img} />
    </mesh>
  );
};

const Scene = ({ onConfirm, onError, type }) => {
  const maxQuantityMistakes = 3;
  const [isShowTip, setIsShowTip] = useState(true);
  const [quantityMistakes, setQuantityMistakes] = useState(0);

  useEffect(() => {
    if (quantityMistakes >= maxQuantityMistakes) {
      onError();
    }
  }, [quantityMistakes]);

  useEffect(() => {
    setQuantityMistakes(0);
    setIsShowTip(true);
  }, [type]);

  return (
    <>
      {isShowTip && (
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            padding: '10px',
            borderRadius: '10px',
          }}
        >
          <p
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              cursor: 'pointer',
              margin: 0,
              padding: '8px',
            }}
            onClick={() => setIsShowTip(false)}
          >
            x
          </p>
          <h3>Find {type}</h3>
        </div>
      )}

      <div
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          color: 'white',
        }}
      >
        <h3>
          Number of errors {quantityMistakes}/{maxQuantityMistakes}
        </h3>
      </div>

      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={type === types.africa ? [0, 1, 0] : [1, 0, 0]}
          near={0.1}
          far={1000}
        />
        <OrbitControls screenSpacePanning={false} minDistance={5} maxDistance={80} />

        <ambientLight color='#ffffff' intensity={1} />
        <Suspense fallback={null}>
          <group>
            <Earth onClick={() => setQuantityMistakes((prev) => prev + 1)} />
            <Space />
            {type === types.pole && (
              <Pole
                onClick={onConfirm}
                rotation={[-45 / (180 / Math.PI), 45 / (180 / Math.PI), 0]}
                args={[1, 32, 32, 0, 75 / (180 / Math.PI), 0, 75 / (180 / Math.PI)]}
              />
            )}
            {type === types.africa && (
              <Pole
                onClick={onConfirm}
                rotation={[310 / (180 / Math.PI), -200 / (180 / Math.PI), 30 / (180 / Math.PI)]}
                args={[1, 32, 32, 0, 75 / (180 / Math.PI), 0, 75 / (180 / Math.PI)]}
              />
            )}
            {type === types.australia && (
              <Pole
                onClick={onConfirm}
                rotation={[55 / (180 / Math.PI), -30 / (180 / Math.PI), 90]}
                args={[1, 32, 32, 0, 50 / (180 / Math.PI), 0, 50 / (180 / Math.PI)]}
              />
            )}
          </group>
        </Suspense>
      </Canvas>
    </>
  );
};

export default Scene;

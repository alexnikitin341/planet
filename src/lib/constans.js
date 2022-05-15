export const types = {
  pole: 'The North Pole',
  africa: 'Africa',
  australia: 'Australia',
  finish: 'Finish',
  start: 'Start',
};

export const typesStep = {
  start: 'start',
  block: 'block',
  blockAfterScene: 'blockAfterScene',
  scene: 'scene',
};

export const blockAfterSceneContent = {
  [types.pole]: { text: 'The polar day, like the polar night, lasts here for about six months' },
  [types.africa]: {
    text: 'Africa is the hottest continent on the planet and is considered the birthplace of mankind',
  },
  [types.australia]: {
    text: 'Australia is the smallest by area and the driest continent on Earth.',
  },
};

export const steps = [
  {
    type: typesStep.start,
    title: types.start,
  },
  {
    type: typesStep.block,
    title: types.pole,
  },
  {
    type: typesStep.scene,
    typeScene: types.pole,
  },
  {
    type: typesStep.blockAfterScene,
    title: types.pole,
  },

  {
    type: typesStep.block,
    title: types.africa,
  },
  {
    type: typesStep.scene,
    typeScene: types.africa,
  },
  {
    type: typesStep.blockAfterScene,
    title: types.africa,
  },

  {
    type: typesStep.block,
    title: types.australia,
  },
  {
    type: typesStep.scene,
    typeScene: types.australia,
  },
  {
    type: typesStep.blockAfterScene,
    title: types.australia,
  },

  {
    type: typesStep.block,
    title: types.finish,
  },
].map((step, i) => ({ ...step, id: i }));

export const typeQuestion = {
  radio: 'radio',
  checkbox: 'checkbox',
  input: 'input',
  chooseImg: 'chooseImg',
};

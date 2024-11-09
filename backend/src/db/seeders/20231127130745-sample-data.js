const db = require('../models');
const Users = db.users;

const Texts = db.texts;

const Translations = db.translations;

const TextsData = [
  {
    content: 'Hello, how can I assist you today?',

    language: 'english',

    // type code here for "relation_one" field

    created_on: new Date('2023-10-01T10:00:00Z'),
  },

  {
    content: '您好，我今天能为您做些什么？',

    language: 'english',

    // type code here for "relation_one" field

    created_on: new Date('2023-10-02T11:30:00Z'),
  },

  {
    content: 'வணக்கம், இன்று உங்களுக்கு எப்படி உதவலாம்?',

    language: 'english',

    // type code here for "relation_one" field

    created_on: new Date('2023-10-03T09:15:00Z'),
  },

  {
    content: 'Please let me know if you need further assistance.',

    language: 'chinese',

    // type code here for "relation_one" field

    created_on: new Date('2023-10-04T14:45:00Z'),
  },
];

const TranslationsData = [
  {
    original_text: 'Good morning, how are you?',

    translated_text: '早上好，你好吗？',

    source_language: 'chinese',

    target_language: 'tamil',

    // type code here for "relation_one" field

    translated_on: new Date('2023-10-01T10:30:00Z'),
  },

  {
    original_text: 'Have a great day!',

    translated_text: 'நல்ல நாளாக இருக்கட்டும்!',

    source_language: 'english',

    target_language: 'tamil',

    // type code here for "relation_one" field

    translated_on: new Date('2023-10-02T12:00:00Z'),
  },

  {
    original_text: '谢谢你的帮助。',

    translated_text: 'Thank you for your help.',

    source_language: 'english',

    target_language: 'english',

    // type code here for "relation_one" field

    translated_on: new Date('2023-10-03T10:00:00Z'),
  },

  {
    original_text: 'நன்றி, உங்கள் உதவிக்கு.',

    translated_text: 'Thank you for your assistance.',

    source_language: 'chinese',

    target_language: 'tamil',

    // type code here for "relation_one" field

    translated_on: new Date('2023-10-04T15:00:00Z'),
  },
];

// Similar logic for "relation_many"

async function associateTextWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Text0 = await Texts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Text0?.setUser) {
    await Text0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Text1 = await Texts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Text1?.setUser) {
    await Text1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Text2 = await Texts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Text2?.setUser) {
    await Text2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Text3 = await Texts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Text3?.setUser) {
    await Text3.setUser(relatedUser3);
  }
}

async function associateTranslationWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Translation0 = await Translations.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Translation0?.setUser) {
    await Translation0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Translation1 = await Translations.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Translation1?.setUser) {
    await Translation1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Translation2 = await Translations.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Translation2?.setUser) {
    await Translation2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Translation3 = await Translations.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Translation3?.setUser) {
    await Translation3.setUser(relatedUser3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Texts.bulkCreate(TextsData);

    await Translations.bulkCreate(TranslationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateTextWithUser(),

      await associateTranslationWithUser(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('texts', null, {});

    await queryInterface.bulkDelete('translations', null, {});
  },
};

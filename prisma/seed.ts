
import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const PROFILE_ID = "main";

async function main() {
  console.log("Starting database seed...");

  await prisma.$transaction(async (tx) => {
    // 1. Profile
    await tx.profile.upsert({
      where: { id: PROFILE_ID },
      update: {
        name: "Александр Мокрецкий",
        title: "Frontend-разработчик",
        description:
          "Frontend-разработчик с опытом коммерческой разработки более 3 лет. Специализируюсь на создании и развитии веб-приложений с использованием Vue 3, Nuxt и TypeScript. Имею опыт работы с Svelte, разработки клиентской и серверной частей игровых проектов, проектирования интерфейсов, реализации сложной бизнес-логики и интеграции с API. Умею разбираться в существующих кодовых базах, проводить рефакторинг и самостоятельно доводить задачи от уточнения требований до реализации.",
        location: "Москва, Россия",
      },
      create: {
        id: PROFILE_ID,
        name: "Александр Мокрецкий",
        title: "Frontend-разработчик",
        description:
          "Frontend-разработчик с опытом коммерческой разработки более 3 лет. Специализируюсь на создании и развитии веб-приложений с использованием Vue 3, Nuxt и TypeScript. Имею опыт работы с Svelte, разработки клиентской и серверной частей игровых проектов, проектирования интерфейсов, реализации сложной бизнес-логики и интеграции с API. Умею разбираться в существующих кодовых базах, проводить рефакторинг и самостоятельно доводить задачи от уточнения требований до реализации.",
        location: "Москва, Россия",
      },
    });

    // 2. Clear existing related data
    await tx.profileLink.deleteMany({
      where: { profileId: PROFILE_ID },
    });

    await tx.skill.deleteMany({
      where: { profileId: PROFILE_ID },
    });

    await tx.experience.deleteMany({
      where: { profileId: PROFILE_ID },
    });

    await tx.project.deleteMany({
      where: { profileId: PROFILE_ID },
    });

    // 3. Profile links
    await tx.profileLink.createMany({
      data: [
        {
          profileId: PROFILE_ID,
          platform: "Telegram",
          value: "https://t.me/rewer42",
        },
        {
          profileId: PROFILE_ID,
          platform: "Email",
          value: "schurikmn@bk.ru",
        },
        {
          profileId: PROFILE_ID,
          platform: "Phone",
          value: "+79507440129",
        },
      ],
    });

    // 4. Skills
    const skills = [
      // Languages
      { name: "JavaScript", category: "Языки программирования" },
      { name: "TypeScript", category: "Языки программирования" },
      { name: "HTML", category: "Frontend" },
      { name: "CSS3", category: "Frontend" },

      // Frameworks
      { name: "Vue.js", category: "Frameworks" },
      { name: "Vue 3", category: "Frameworks" },
      { name: "Nuxt 4", category: "Frameworks" },
      { name: "Svelte", category: "Frameworks" },
      { name: "Pinia", category: "State Management" },
      { name: "Vue Router", category: "Frameworks" },

      // UI
      { name: "PrimeVue", category: "UI" },
      { name: "Tailwind CSS", category: "UI" },
      { name: "TipTap", category: "UI" },

      // Libraries
      { name: "VueUse", category: "Libraries" },
      { name: "Yup", category: "Libraries" },
      { name: "Chart.js", category: "Libraries" },

      // API and integrations
      { name: "REST API", category: "API & Integrations" },
      { name: "OpenAPI Codegen", category: "API & Integrations" },
      { name: "SignalR", category: "API & Integrations" },
      { name: "JWT", category: "API & Integrations" },
      { name: "Nuxt i18n", category: "API & Integrations" },
      { name: "RageMP API", category: "API & Integrations" },

      // Tools
      { name: "Git", category: "Tools" },
      { name: "GitLab", category: "Tools" },
      { name: "Docker", category: "Tools" },
      { name: "Yarn Workspaces", category: "Tools" },
      { name: "Turborepo", category: "Tools" },
      { name: "ESLint", category: "Tools" },
      { name: "Prettier", category: "Tools" },
      { name: "PWA", category: "Tools" },
    ];

    await tx.skill.createMany({
      data: skills.map((skill, index) => ({
        ...skill,
        profileId: PROFILE_ID,
        sortOrder: index,
      })),
    });

    // 5. Work experience

    // Alt.Point
    await tx.experience.create({
      data: {
        profileId: PROFILE_ID,
        company: "Alt.Point",
        position: "Frontend-разработчик",
        description:
          "Разработка и поддержка frontend четырёх веб-проектов: финансовой системы, аукционной платформы, маркетплейса и корпоративного приложения. Участие в переписывании legacy-проектов на Vue 3 и TypeScript, развитие существующей кодовой базы, реализация бизнес-функциональности и рефакторинг.",
        startDate: new Date("2025-10-01T00:00:00.000Z"),
        endDate: new Date("2026-09-30T00:00:00.000Z"),
        sortOrder: 0,

        achievements: {
          create: [
            {
              description:
                "Участвовал в переписывании трёх проектов с legacy-кода на современный стек Vue 3 и TypeScript.",
              sortOrder: 0,
            },
            {
              description:
                "Разрабатывал финансовую систему: управление компаниями, контрагентами, агентами, клиентами и финансовыми транзакциями.",
              sortOrder: 1,
            },
            {
              description:
                "Реализовывал сложные формы, таблицы, фильтрацию, массовое редактирование, отчёты и управление правами доступа.",
              sortOrder: 2,
            },
            {
              description:
                "Разрабатывал аукционную платформу: создание и перемещение лотов, размещение обычных и автоматических ставок, таймеры и состояния аукционов.",
              sortOrder: 3,
            },
            {
              description:
                "Разрабатывал маркетплейс: каталог товаров и услуг, корзину, оформление заказов, оплату, авторизацию, SSR и управление витринами магазинов.",
              sortOrder: 4,
            },
            {
              description:
                "Развивал корпоративное приложение, реализовывал авторизацию, управление ролями и интеграцию с API.",
              sortOrder: 5,
            },
            {
              description:
                "Самостоятельно уточнял требования, предлагал варианты реализации и согласовывал технические решения с менеджером.",
              sortOrder: 6,
            },
          ],
        },
      },
    });

    // ValhallaAge
    await tx.experience.create({
      data: {
        profileId: PROFILE_ID,
        company: "ValhallaAge",
        position: "Frontend-разработчик",
        description:
          "Разработка и поддержка клиентской и серверной частей игрового проекта. Проектирование и реализация игровых систем, бизнес-логики, интерфейсов и взаимодействия между клиентом и сервером.",
        startDate: new Date("2023-07-01T00:00:00.000Z"),
        endDate: new Date("2025-08-31T00:00:00.000Z"),
        sortOrder: 1,

        achievements: {
          create: [
            {
              description:
                "Участвовал в проектировании и реализации архитектуры игровых систем, включая инвентарь и боевой пропуск.",
              sortOrder: 0,
            },
            {
              description:
                "Разрабатывал интерфейсы на Svelte и TypeScript: переиспользуемые модальные окна, контекстные меню, систему подсказок и Drag & Drop.",
              sortOrder: 1,
            },
            {
              description:
                "Оптимизировал загрузку сообщений игрового мессенджера с помощью ленивой подгрузки, сократив время загрузки на 90%.",
              sortOrder: 2,
            },
            {
              description:
                "Реализовывал взаимодействие клиентской и серверной частей через RageMP API, занимался диагностикой и логированием.",
              sortOrder: 3,
            },
            {
              description:
                "Разработал вспомогательное приложение для гейм-дизайнера, автоматизировав часть работы с JSON-данными.",
              sortOrder: 4,
            },
            {
              description:
                "Проводил рефакторинг существующего кода, исправлял ошибки и участвовал в обсуждении технических решений команды.",
              sortOrder: 5,
            },
          ],
        },
      },
    });

    // 6. Projects
    const projects = [
      {
        name: "Финансовая система",
        description:
          "Корпоративная финансовая система для управления компаниями, контрагентами, агентами, клиентами и финансовыми транзакциями. Сложные формы, фильтры, таблицы, отчёты, массовое редактирование и управление правами доступа.",
      },
      {
        name: "Аукционная платформа",
        description:
          "Веб-платформа для проведения аукционов. Создание и перемещение лотов, размещение обычных и автоматических ставок, таймеры аукционов, административные инструменты управления галереей и кураторством.",
      },
      {
        name: "Маркетплейс",
        description:
          "Платформа электронной коммерции с каталогом товаров и услуг, корзиной, оформлением заказов и оплатой. SSR, авторизация, подписки, категории и настраиваемые витрины магазинов.",
      },
      {
        name: "Корпоративное приложение",
        description:
          "Корпоративное веб-приложение с авторизацией, управлением ролями пользователей, отображением статусов и интеграцией с API.",
      },
      {
        name: "ValhallaAge",
        description:
          "Игровой проект с клиентской и серверной архитектурой. Разработка игровых систем, интерфейсов, инвентаря, боевого пропуска и взаимодействия между клиентом и сервером.",
      },
      {
        name: "Инструмент для гейм-дизайнера",
        description:
          "Вспомогательное приложение для автоматизации работы с JSON-данными игрового проекта.",
      },
    ];

    await tx.project.createMany({
      data: projects.map((project, index) => ({
        ...project,
        profileId: PROFILE_ID,
        url: null,
        isPrivate: true,
        sortOrder: index,
      })),
    });
  });

  console.log("Database successfully seeded!");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

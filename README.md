This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Сравнение Redux и MobX

## Детальное сравнение

| Критерий                     | Redux                                                                                                                                           | MobX                                                                                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Паттерн**                  | **Функциональное программирование**.<br>Состояние **иммутабельно**. Изменения через чистые функции.                                             | **Реактивное и ООП-программирование**.<br>Состояние **мутабельно**. Использует наблюдаемые объекты.                                                |
| **Поток данных**             | **Однонаправленный, явный.**<br>`View → Action → Reducer → Store → View`                                                                        | **Двунаправленный, автоматический.**<br>`View → Action (мутация State) → (автоматически) View`                                                     |
| **Как изменяется состояние** | Через **"action"** (объект) и **"reducer"** (чистая функция).<br>Reducer возвращает **НОВУЮ** копию состояния.                                  | Прямое присваивание (**мутация**) в **"action"**.<br>Просто меняем свойство объекта.                                                               |
| **Структура состояния**      | Единое, **нормализованное** состояние в виде plain JS-объекта. Часто неизменяемое (с помощью Immer).                                            | **Денормализованное**, может состоять из множества взаимосвязанных **"store"**-классов.                                                            |
| **Подписка на изменения**    | Компонент явно подписывается на части состояния с помощью **`useSelector`**. Перерисовка происходит, когда ссылка на эту часть меняется.        | Компонент автоматически отслеживает (**track**) используемые **observable**-поля. Перерисовка при их изменении.                                    |
| **Сложность кода**           | **Больше шаблонного кода (boilerplate).** Нужно создавать константы, action creators, reducers.                                                 | **Меньше кода.** Возможность изменить состояние напрямую `this.todos.push(newTodo)`                                                                |
| **Кривая обучения**          | Выше. Нужно понимать иммутабельность, чистые функции, иногда middleware (redux-thunk, redux-saga).                                              | Ниже. Более интуитивно для тех, кто привык к ООП и прямому изменению данных.                                                                       |
| **Производительность**       | Хорошая. Компоненты перерисовываются, только когда их выделенные данные изменились по ссылке.                                                   | Отличная. Система автоматически отслеживает зависимости и обновляет только те компоненты, которые "видят" самые мелкие изменения.                  |
| **Отладка**                  | **Превосходная.** DevTools позволяют "путешествовать во времени", смотреть каждое действие и состояние. Предсказуемость помогает находить баги. | Хорошая, но другая. MobX имеет DevTools, но из-за мутаций и автоматических реакций иногда сложнее проследить цепочку причинно-следственных связей. |
| **Масштабируемость**         | Очень высокая. Строгая структура и предсказуемость помогают в больших командах и на сложных проектах.                                           | Хорошая, но требует большей дисциплины от разработчиков, чтобы не создать "магию" и неразбериху с зависимостями.                                   |

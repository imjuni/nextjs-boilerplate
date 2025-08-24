# Next.js Boilerplate

Modern Next.js Boilerplate

## Todo

- [x] i18n
  - 현재 사용 기준을 보면 cookie, without url
- [x] API client (axios, ky, fetch)
  - jin-frame + axios
~~ - [ ] SWR ~~
  ~~ - data fetch 이 후 zustand까지 자연스럽게 바인딩 ~~
  ~~ - 필요한 경우 데이터 바인딩 이 후 reflow까지 ~~
- [x] prettier
- [x] zustand
- [x] react-hook-form
- [x] zod
- [x] shadcn
- [ ] git hook (husky)
- [x] tailwindCSS & custom css
- [x] eslint v9 (with airbnb)
- [x] eslint + lint-stage
- [x] vitest - unit test
- [ ] vitest - unit test with zustand
- [ ] playwright - e2e test

## SWR

데이터 fetch에 SWR을 쓰려고 했다. 캐시도 잘되고 편리해보여서. 근데 SWR은 Hook으로 설계가 되어서 react-hook-form 처럼 자체적으로 store를 제공하는 경우 연동에 불편함이 있고 컴포넌트가 렌더링 될 때 useState처럼 사용해야 하기 때문에 미묘하게 사용하기 편해보이지 않았다. zustand가 data-fetch를 하는 부분을 추가한 느낌인데 이 것이 그리 편리해보이지 않았다.

```ts
  const form = useForm<TForm>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schema),
  });

  // data는 처음 렌더링 될 때는 undefined 값이고, error, isMutating도 마찬가지이다
  const { trigger, data, error, isMutating } = useSWRMutation(
    PokemonFrame.getEndpoint().pathname,
    async () => {
      const frame = PokemonFrame.of((b) =>
        // 여기에서 react-hook-form의 값을 가져와서 바인딩 한다
        b.from({ name: form.getValues().name }),
      );
      return frame.execute();
    },
  );

  const onSubmit: SubmitHandler<TForm> = async () => {
    // submit이 되었을 때 trigger를 호출해서 useSWRMutation에서 결과 값으로 받은 data 객체에 바인딩을 시도한다. 
    await trigger();

    // trigger는 비동기 함수 이지만 await 이 후 data 값이 반드시 바인딩 되는 것은 아니다.
    // data 값은 state라서 자연스럽게 데이터가 채워지고, 채워진 데이터를 렌더링 하면 된다
    console.log(data, error, isMutating);
  };
```

일단 데이터가 바인딩 되는 시점을 명확하게 알 수 없는 것이 좀 불편했다. 그리고 뭔가 미묘하다고 생각한 점은 data를 읽은 이 후 재가공을 하거나, 결과에 맞춰서 전체 컴포넌트의 상태를 바꿀 때 복잡한 비즈니스 로직을 수행해야 할 수 있는데 바인딩만 하는 것이 미묘했다. 그래도 짧은 시간에 jotai보다 더 인기 있는 프레임워크가 된 것은 신기하기도 하고, 또 굉장히 잘 관리되고 있어서 발전 가능성도 높다고 생각한다. 변경이 많이 필요한 경우가 아니라면 정말 유용하게 쓸 수 있을 것이라고 생각한다.

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

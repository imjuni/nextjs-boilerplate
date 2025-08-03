import { Main } from '#/components/common/main/Main';
import { Logo } from '#/components/common/navbar/Logo';
import { Navbar } from '#/components/common/navbar/Navbar';

const Home: React.FC = () => (
  <div className="flex w-[100vw] h-[100vh]">
    <Navbar>
      <Logo message="Next" />
    </Navbar>

    <Main>
      <div className="flex p-3 h-full w-full">
        <ul className="m-auto list-disc">
          <li>next.js</li>
          <li>eslint v9</li>
          <li>lint-stage</li>
          <li>prettier</li>
          <li>husky: git hook</li>
          <li>axios</li>
          <li>vitest</li>
          <li>zustand</li>
          <li>vitest with zustand</li>
          <li>playwright</li>
          <li>next-i18n: cookies</li>
        </ul>
      </div>
    </Main>
  </div>
);

export default Home;

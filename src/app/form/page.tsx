import FormModule from '#/app/form/(modules)/FormModule';
import { Main } from '#/components/common/main/Main';
import { Logo } from '#/components/common/navbar/Logo';
import { Navbar } from '#/components/common/navbar/Navbar';

const Form: React.FC = () => (
  <div className="flex w-[100vw] h-[100vh]">
    <Navbar>
      <Logo message="Form" />
    </Navbar>

    <Main>
      <div className="flex p-3 h-full w-full">
        <FormModule />
      </div>
    </Main>
  </div>
);

export default Form;

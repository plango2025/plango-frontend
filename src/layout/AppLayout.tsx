import { Container} from './GridLayout';
import Sidebar from './Sidebar';

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <Sidebar />
      <Container>
        {children}
      </Container>
    </>
  );
}


export default AppLayout;

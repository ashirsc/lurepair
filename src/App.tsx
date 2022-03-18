import { useState } from "react";
import "antd/dist/antd.css";
import { Button, Layout, Header, Content, Footer } from "antd";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <Button variant="primary" onClick={() => setCount(count + 1)}>
          You have clicked, {count} times
        </Button>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;

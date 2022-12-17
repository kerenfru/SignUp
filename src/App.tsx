import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import Form from "./components/Form/Form";
import "./App.scss";
import axios from "axios";
import { getAccessToken } from "./services/locations";
import { LoadingOutlined } from "@ant-design/icons";

axios.defaults.baseURL = "https://www.universal-tutorial.com/api";

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const { auth_token } = await getAccessToken();
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth_token}`;
      setLoading(false);
    };
    if (loading) {
      fetchData().catch(() => {
         setLoading(false);
      });
    }
  });

  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

  return (
    <div className="App">
      {loading ? <Spin indicator={antIcon} /> : <Form />}
    </div>
  );
}

export default App;

import { useParams } from "react-router-dom";
import Layout from "../app/layout";
import WebRTCPlayer from "../components/stream/WebRTCPlayer";

const CameraDetails = () => {
  const { id } = useParams();

  return (
    <Layout>
      <h1 className="text-xl mb-4">Live Stream</h1>
      <WebRTCPlayer path={`user-${id}`} />
    </Layout>
  );
};

export default CameraDetails;
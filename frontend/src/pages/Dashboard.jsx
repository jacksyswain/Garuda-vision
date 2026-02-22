import Layout from "../app/layout";
import CameraGrid from "../components/camera/CameraGrid";

const Dashboard = () => {
  return (
    <Layout>
      <h1 className="text-2xl mb-6">Your Cameras</h1>
      <CameraGrid />
    </Layout>
  );
};

export default Dashboard;
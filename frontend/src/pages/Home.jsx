// pages/Home.jsx
import NewsList from "../components/NewsList"

export default function Home() {
  return (
    <div className="home-page">
      <NewsList category="all" />
    </div>
  );
}
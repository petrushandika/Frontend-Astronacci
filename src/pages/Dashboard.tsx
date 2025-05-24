import ArticleList from "./Articles/ArticleList";
import ContentList from "./Content/ContentList";

function Dashboard() {
  return (
    <div className="flex flex-col px-12 py-6 gap-y-10">
      <ArticleList />
      <ContentList />
    </div>
  );
}

export default Dashboard;

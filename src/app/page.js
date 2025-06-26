export default async function Home() {
  // Fetch categories
  const categoryResponse = await fetch(`https://opentdb.com/api_category.php`);
  const categories = await categoryResponse.json();

  // Fetch total question count for all categories ("Any Category")
  const countResponse = await fetch(`https://opentdb.com/api_count_global.php`);
  const countData = await countResponse.json();
  const maxQuestions = countData.overall.total_num_of_questions;

  return (
    <>
      <form method="GET" action="/quiz">
        <div>
          <label>Select Category</label>
          <select name="category">
            <option>Any Category</option>
            {categories.trivia_categories.map(result => (
              <option key={result.id} value={result.id}>{result.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Number of Questions</label>
          <select name="amount" defaultValue="10">
            {[...Array(Math.min(maxQuestions, 50))].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Difficulty</label>
          <select defaultValue="difficulty" name="difficulty">
            <option>Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label>Select Type</label>
          <select name="type">
            <option defaultValue="type">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>

        <button type="submit">Quiz Time</button>
      </form>
    </>
  );
}


export default async function Home() {
  

  const categoryResponse = await fetch(`https://opentdb.com/api_category.php`);
  const categories = await categoryResponse.json();

  const questionCountResponse = await fetch (`https://opentdb.com/api_count.php${category}`);
  const questionCounter = await questionCountResponse.json();

  console.log(questionCounter)

  return (
    <>
      <form method="GET" action="/quiz">
        <div>
          <label>Select Category</label>
          <select name="category">
            <option defaultValue="category">Any Category</option>
            {categories.trivia_categories.map (result => (
              <option key={result.id} value={result.id}>{result.name}</option>
            ))}
            </select>
        </div>

        <div>
          <label>Number of Questions</label>
          <input  defaultValue="amount" name="amount" disabled />
        </div>
        

        <div>
          <label>Select Difficulty</label>
          <select defaultValue="difficulty"name="difficulty">
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

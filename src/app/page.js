

export default async function Home() {

  const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
  const tokenData = await tokenResponse.json();
  const sessionToken = tokenData.token;

  const response = await fetch(`https://opentdb.com/api.php?amount=10&token=${sessionToken}`);
  const questions = await response.json();

  const categoryResponse = await fetch(`https://opentdb.com/api_category.php`);
  const categories = await categoryResponse.json();


  return (
    <>
      <form method="GET" action="/quiz">
        <div>
          <label>Number of Questions</label>
          <select defaultValue="amount" name="amount">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
          </select>
        </div>
        
        <div>
          <label>Select Category</label>
          <select>
            <option defaultValue="category" name="category">Any Category</option>
            {categories.trivia_categories.map (result => (
              <option key={result.id} value={result.id}>{result.name}</option>
              ))}
            </select>
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
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True / False</option>
          </select>
        </div>

        <button type="submit">Quiz Time</button>
      </form>
    </>
  );
}

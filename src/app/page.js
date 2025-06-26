
export default async function Home() {


  const categoryResponse = await fetch(`https://opentdb.com/api_category.php`);
  const categories = await categoryResponse.json();


  console.log()

  return (
    <>
      <form method="GET" action="/quiz" className="flex-inline w.full align-center content-center">
        <h1 className="flex justify-center">Questinoir</h1>
        <p>test your quessing skills</p>
      <div className="width.full">
        <div>
          <label>Select Category</label>
          <select required name="category">
            <option value="">Any Category</option>
            {categories.trivia_categories.map(result => (
              <option key={result.id} value={result.id}>{result.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Number of Questions</label>
          <select name="amount" defaultValue="10">
            {[...Array(46)].map((_, i) => (
              <option key={i + 5} value={i + 5}>{i + 5}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Difficulty</label>
          <select required defaultValue="difficulty" name="difficulty">
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label>Select Type</label>
          <select required name="type">
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
        <button className="bg-[#aaaaaa] text-[#140909]" type="submit">Quiz Time</button>
        </div>

      </form>
    </>
  );
}

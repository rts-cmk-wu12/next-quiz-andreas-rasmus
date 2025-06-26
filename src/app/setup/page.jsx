export default async function SetupPage({ searchParams }) {
  const { category } = searchParams;
  let max = null;

  if (category) {
    const res = await fetch(`https://opentdb.com/api_count.php?category=${category}`);
    const data = await res.json();
    max = data.category_question_count.total_question_count;
  }

  return (
    <form method="GET" action="/quiz/start">
      <input type="hidden" name="category" value={category || ''} />
      <div>
        <label>Number of Questions</label>
        {max ? (
          <select name="amount" required>
            {Array.from({ length: max }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        ) : (
          <span>Please select a category to choose the amount of questions.</span>
        )}
      </div>
      {/* Add difficulty/type selects here if needed */}
      <button type="submit" disabled={!max}>Start Quiz</button>
    </form>
  );
}



export default async function Home() {

  const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
  const tokenData = await tokenResponse.json();
  const sessionToken = tokenData.token;

  const response = await fetch(`https://opentdb.com/api.php?amount=10&token=${sessionToken}`);
  const questions = await response.json();

  console.log(questions);
  

  return (
    <>
      <form>
        <div>
          <label>Select Category</label>
          <option></option>
        </div>

        <div>
          <label>Select Difficulty</label>
          <option></option>
        </div>

        <div>
          <label>Select Type</label>
          <option></option>
        </div>

      </form>
    </>
  );
}

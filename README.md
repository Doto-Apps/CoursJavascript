# MMI2 Course

This repo is for students in MMI2, he is including :

- Javascript

## Start this project

- Install `pnpm`, `node`
- Clone this project
- Run the following commands :

```bash
pnpm install
pnpm run dev
```

- Go to `http://localhost:4321/fr`

## Develop

- The routing is automatic and managed by Astro
- Create a file inside fr folder to make it exist in the routing
- Add the route in `Sidebar.astro`
- Add the name of the link in `i18n/fr.ts`

## Pull requestt

- Develop on your own branch
- Push it then open a pull request

## Deploy

- Need to push on main and it will deploy it on a server
- Deployment is based on a docker image that we build through `Github CI` and push it to the registry, then the CI will trigger the docker image update on the server
- Find the CI configuration in `.github/workflows/`

## How quiz works

- There are a google drive folder where we put all tests
- You need to create one from the `template.json`, change `template` by the name of the quiz that will be used in the url.
- If you named it `example.json` you can access it through `/fr/quiz/example/`
- Questions are choosen randomly by selecting one not answered by the student
- **TO PROVENT CHEATING**: When the land on a new question it cant change the question number in the url, it will count as  false answer


## Configure the quiz

- **name** : The name of the quiz
- **mode**:
  - **train**: No timer on each questions
  - **exam**: Timer will be applied on each questions
  - **close**: Students can't access the quiz
- **questionsPerTest**: Choose a number of questions to ask for a test
- **timeByQuestionInSeconds**:
  - **x <= 0**: Unlimited time
  - **x > 0**: Set a timer of x seconds for each questions when in `exam` mode
- **questions**: An array of questions containing question string, answers strings and the correctAnswerIndex
  - **question**: The question to ask
  - **answers**: Array of string of possible answers
  - **correctAnswerIndex**: The correct answer index (starting at 0)

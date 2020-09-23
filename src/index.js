import { main } from './setup';

main()
  .then(({ server }) => {
    server.listen(3001, () => {
      console.log(`Server is up on http://localhost:3001`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

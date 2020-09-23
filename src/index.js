import('./setup')
  .then(({ setup }) => setup())
  .then(async (main) => {
    const { server } = await main();
    server.listen(3001, () => {
      console.log(`Server is up on http://localhost:3001`);
    });
  });

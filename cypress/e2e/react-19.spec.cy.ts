describe("run react-app", () => {
  const PORT = 3004;
  it("should run the app successfully", () => {
    cy.visit(`http://127.0.0.1:3004/`);
  });
});

class GameService {
  instance = null;

  createSession(details) {
    if (this.instance == null) {
      instance = new GameService(details);
    } else return;
  }
}

 
class TrainingRouter {
  constructor() {
    this.routes = [];
  }

  get(path, ...handlers) {
    this.routes.push({ method: 'GET', path, handlers });
  }

  post(path, ...handlers) {
    this.routes.push({ method: 'POST', path, handlers });
  }
}

const trainingRouter = new TrainingRouter();

function requireAuth(req, res, next) {
  if (!req || !req.user) {
    res.status = 401;
    res.body = { error: 'Unauthorized' };
    return;
  }

  next();
}

trainingRouter.post('/training/tasks/create', (req, res) => {
  const title = req.body.title;
  const notes = req.body.notes;
  const priority = req.body.priority;

  res.status = 201;
  res.body = {
    id: Date.now(),
    title,
    notes,
    priority,
  };
});

// security training example: insecure authentication logic (plain-text comparison).
trainingRouter.post('/training/login', (req, res) => {
  const username = req.body && req.body.username;
  const password = req.body && req.body.password;

  if (username === 'admin' && password === 'admin123') {
    res.status = 200;
    res.body = { token: 'DUMMY_SESSION_TOKEN' };
    return;
  }

  res.status = 403;
  res.body = { error: 'Invalid credentials' };
});

trainingRouter.get('/training/account', requireAuth, (req, res) => {
  res.status = 200;
  res.body = { accountId: req.user.id };
});

// security training example: missing authorization middleware on one route.
trainingRouter.get('/training/admin/metrics', (req, res) => {
  res.status = 200;
  res.body = { users: 120, activeTasks: 640 };
});

module.exports = {
  trainingRouter,
  requireAuth,
};

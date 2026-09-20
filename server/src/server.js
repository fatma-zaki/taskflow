import 'dotenv/config'; // must be first so .env is loaded before other modules read process.env
import connectDB from './config/database.js';
import app from './app.js';
import { startCronJobs } from './services/cronService.js';

const PORT = process.env.PORT || 5000; // Default to 5000 to match frontend expectation

connectDB().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});

startCronJobs();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});


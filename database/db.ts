import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true); // Optional: enable for logging SQL statements
SQLite.enablePromise(true); // Enables promise-based API

let db: SQLite.SQLiteDatabase | null = null;

// Open the database (or create it if it doesn't exist)
export const initializeDB = async () => {
  try {
    db = await SQLite.openDatabase({ name: 'tasks.db', location: 'default' });
    console.log('Database opened successfully');
    await createTable(); // Create the table after opening the DB
    return db; // Return the database instance
  } catch (error) {
    console.error('Error opening database:', error);
    return null; // Return null on error
  }
};


// Create the tasks table
export const createTable = async () => {
  if (!db) {
    console.error('Database not initialized. Cannot create table.');
    return;
  }

  try {
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        date TEXT,
        time TEXT,
        location TEXT,
        status TEXT
      );
    `);
    console.log('Table created or already exists');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

// Fetch tasks from the database
export const getTasks = async (status: string, successCallback: (tasks: any[]) => void) => {
  if (!db) {
    console.error('Database is not initialized');
    return;
  }

  try {
    const [result] = await db.executeSql(`SELECT * FROM tasks WHERE status = ?`, [status]);
    const tasks = result.rows.raw(); // Get all rows as an array
    console.log('Fetched tasks:', tasks); // Log fetched tasks
    successCallback(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};


// Add a new task
export const addTask = async (task: { title: string, description: string, date: string, time: string, location: string }) => {
  if (!db) {
    console.error('Database not initialized. Cannot add task.');
    return;
  }

  try {
    await db.executeSql(
      `INSERT INTO tasks (title, description, date, time, location, status) VALUES (?, ?, ?, ?, ?, ?)`,
      [task.title, task.description, task.date, task.time, task.location, 'Ongoing']
    );
    console.log('Task added successfully');
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

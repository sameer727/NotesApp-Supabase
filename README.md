# 📝 NotesApp - React + Supabase

A modern notes application built with React frontend and Supabase backend for storing and managing notes.

## Features

- ✨ Create, read, update, and delete notes
- 🎨 Modern, responsive UI with glassmorphism design
- ⚡ Real-time data synchronization with Supabase
- 📱 Mobile-friendly interface
- 🔄 Inline editing capabilities
- 📅 Automatic timestamps

## Tech Stack

- **Frontend**: React 18
- **Backend**: Supabase (PostgreSQL + Real-time)
- **Build Tool**: Vite
- **Styling**: CSS3 with modern design patterns

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is created, go to Settings > API
3. Copy your **Project URL** and **anon public** key

### 3. Configure Environment

Update the `src/supabase.js` file with your Supabase credentials:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
```

### 4. Create Database Table

In your Supabase dashboard, go to SQL Editor and run this query to create the notes table:

```sql
CREATE TABLE notes (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for demo purposes)
-- In production, you should implement proper authentication and authorization
CREATE POLICY "Allow all operations" ON notes FOR ALL USING (true);
```

### 5. Run the Application

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Application styles
├── main.jsx         # Application entry point
└── supabase.js      # Supabase client configuration
```

## Usage

1. **Create a Note**: Fill in the title and content fields, then click "Add Note"
2. **Edit a Note**: Click the "Edit" button on any note to modify it inline
3. **Delete a Note**: Click the "Delete" button to remove a note (with confirmation)
4. **View Notes**: All notes are displayed in a responsive grid layout

## API Endpoints

The application uses Supabase's auto-generated REST API:

- `GET /notes` - Fetch all notes
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

## Customization

### Styling
The application uses custom CSS with a modern design. You can modify `src/App.css` to customize the appearance.

### Database Schema
You can extend the notes table by adding more columns like:
- `tags` (for categorizing notes)
- `user_id` (for multi-user support)
- `is_favorite` (for bookmarking)

### Features
Consider adding these features:
- Search functionality
- Note categories/tags
- Rich text editing
- File attachments
- User authentication

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your Supabase environment variables
4. Deploy!

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Add your Supabase environment variables

## Environment Variables

For production, consider using environment variables:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then update `src/supabase.js`:

```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own applications!

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Supabase configuration
3. Ensure the database table is created correctly
4. Check that RLS policies are set up properly 
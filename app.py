import os
import sqlite3
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            long_description TEXT,
            technologies TEXT NOT NULL,
            image_path TEXT NOT NULL,
            url TEXT,
            github_url TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Initialize database when app starts
init_db()

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def home():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM projects')
    projects = c.fetchall()
    conn.close()
    
    # Convert to list of dictionaries for easier template handling
    projects = [
        {
            'id': p[0],
            'name': p[1],
            'description': p[2],
            'long_description': p[3],
            'technologies': p[4],
            'image_path': p[5],
            'url': p[6],
            'github_url': p[7]
        } for p in projects
    ]
    
    return render_template('index.html', projects=projects)

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/admin/add-project', methods=['POST'])
def add_project():
    try:
        name = request.form.get('name')
        description = request.form.get('description')
        long_description = request.form.get('long_description')
        technologies = request.form.get('technologies')
        url = request.form.get('url')
        github_url = request.form.get('github_url')
        image = request.files.get('image')
        
        if image:
            filename = secure_filename(image.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image.save(image_path)
            
            # Save to database
            conn = sqlite3.connect('database.db')
            c = conn.cursor()
            c.execute('''
                INSERT INTO projects (name, description, long_description, technologies, image_path, url, github_url)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (name, description, long_description, technologies, f"uploads/{filename}", url, github_url))
            conn.commit()
            conn.close()
            
            return "<div class='message success'>Project added successfully!</div>"
        
        return "<div class='message error'>Please provide an image</div>"
        
    except Exception as e:
        return f"<div class='message error'>Error: {str(e)}</div>"

@app.route('/project/<int:project_id>')
def project_details(project_id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM projects WHERE id = ?', (project_id,))
    project_data = c.fetchone()
    conn.close()
    
    if project_data is None:
        return redirect('/')
        
    project = {
        'id': project_data[0],
        'name': project_data[1],
        'description': project_data[2],
        'long_description': project_data[3],
        'technologies': project_data[4],
        'image_path': project_data[5],
        'url': project_data[6],
        'github_url': project_data[7]
    }
    
    return render_template('project_details.html', project=project)

if __name__ == '__main__':
    app.run(debug=True) 
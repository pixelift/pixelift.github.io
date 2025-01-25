import os
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/admin/add-project', methods=['POST'])
def add_project():
    name = request.form.get('name')
    description = request.form.get('description')
    technologies = request.form.get('technologies')
    image = request.files.get('image')
    
    if image:
        filename = secure_filename(image.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(image_path)
        
        # Here you would typically save the project details to your database
        # For now, we'll just return a success message
        return "<div class='message success'>Project added successfully!</div>"
    
    return "<div class='message error'>Error adding project</div>"

if __name__ == '__main__':
    app.run(debug=True) 
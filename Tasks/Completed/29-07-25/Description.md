# GitHub Session (29-07-25)

## Introduction to Git

Git is a distributed version control system that helps track changes in your code and collaborate with others. It allows you to:
- Track changes over time
- Work on different features simultaneously
- Collaborate with team members
- Revert to previous versions if needed

### Key Concepts
- **Repository**: A directory containing your project and its version history
- **Commit**: A snapshot of your code at a specific point in time
- **Branch**: A separate line of development
- **Remote**: A copy of your repository stored on a server (like GitHub)

### Basic Commands

1. **git init**: Initialize the repository. File tracking started.
   - Creates a new Git repository in the current directory
   - Sets up the `.git` folder with all necessary files
   - Example: `git init`

2. **git status**: 
   - Shows the current state of the working directory and staging area
   - Displays which files are tracked, modified, staged, or untracked
   - Example: `git status`

3. **git log**: 
   - Shows the commit history of the repository
   - Displays commit hashes, authors, dates, and commit messages
   - Example: `git log` or `git log --oneline` for compact view

### Advanced Commands

4. **git add**: Stage files for commit
   - `git add <filename>` - Add specific file
   - `git add .` - Add all files in current directory
   - Example: `git add README.md`

5. **git commit**: Create a new commit with staged changes
   - `git commit -m "commit message"` - Commit with message
   - Example: `git commit -m "Initial commit"`

6. **git branch**: Manage branches
   - `git branch` - List all branches
   - `git branch <branch-name>` - Create new branch
   - Example: `git branch feature-branch`

7. **git checkout**: Switch between branches or restore files
   - `git checkout <branch-name>` - Switch to branch
   - `git checkout -b <branch-name>` - Create and switch to new branch
   - Example: `git checkout master`

8. **git merge**: Merge branches
   - `git merge <branch-name>` - Merge specified branch into current branch
   - Example: `git merge feature-branch`

9. **git remote**: Manage remote repositories
   - `git remote add origin <url>` - Add remote repository
   - `git remote -v` - List remote repositories
   - Example: `git remote add origin https://github.com/devkartikrathi/arcap.git`

10. **git push**: Push commits to remote repository
    - `git push origin <branch-name>` - Push to specific branch
    - Example: `git push origin master`

11. **git pull**: Fetch and merge changes from remote repository
    - `git pull origin <branch-name>` - Pull from specific branch
    - Example: `git pull origin master`

12. **git clone**: Clone a repository from remote
    - `git clone <url>` - Clone repository to local machine
    - Example: `git clone https://github.com/devkartikrathi/arcap.git`


## Workflow Examples

### Basic Development Workflow
1. Make changes to files
2. Check status: `git status`
3. Stage changes: `git add .`
4. Commit changes: `git commit -m "Descriptive message"`
5. Push to remote: `git push origin main`

### Feature Branch Workflow
1. Create feature branch: `git checkout -b feature-name`
2. Make changes and commit them
3. Push feature branch: `git push origin feature-name`
4. Create pull request on GitHub
5. Merge after review

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit with clear messages
5. Push to your fork
6. Create a pull request
This is a quick hack (Chrome Extension) I did (via AI assisted coding) for BRouter-Web to allow me to recolor the blue imported GPX tracks.
Note that currently the functionality is limited. The Extensions modifies the DOM and recolors the path elements there. Elements that are hidden during recoloring don't remember their state, so you can only globally change the path color to a custom color / opacity and import a few blue default tracks after that if needed.
At the moment, no seperate coloring of isolated tracks is possible by hiding / unhiding paths that should not be affected.

<img width="175" height="138" alt="image" src="https://github.com/user-attachments/assets/eb87b9ad-8b49-4078-b60f-fda01dcd50f3" />


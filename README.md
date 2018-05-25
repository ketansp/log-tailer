# log-tailer
An equivalent of tail -f in node.js

### Install NVM and node version 8.9.0
```
touch ~/.bash_profile
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
source ~/.bash_profile
nvm install 8.9.0
nvm use 8.9.0
nvm alias default 8.9.0
```

### Install local dependencies from project directory
```npm install``` or ```yarn install```



### Starting server on your machine
You can access the application at `localhost:3000`

- Starting Node server
`node server/sever.js path_to_file`


### Text editor settings
Please make sure your text editor is configured properly before you start contributing.
Use below settings for sublime text editor.
```
"tab_size": 2,
"translate_tabs_to_spaces": true,
"trim_trailing_white_space_on_save": true,
"ensure_newline_at_eof_on_save": true,
```
Use below settings for visual studio Code
```
"editor.tabSize": 2,
"editor.insertSpaces": true,
"editor.trimAutoWhitespace": true,
"files.insertFinalNewline": true

```

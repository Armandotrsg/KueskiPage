source kill_site.sh

tmux new-session -d

tmux send-keys -t 0 "cd ./backend" ENTER
tmux send-keys -t 0 "npm start" ENTER

tmux new-session -d

tmux send-keys -t 1 "npm run dev" ENTER



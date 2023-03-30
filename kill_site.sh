if tmux list-sessions >/dev/null 2>&1; then
    tmux send-keys -t 0 C-c
fi
tmux kill-server
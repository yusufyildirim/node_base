#! /bin/bash
# inspired: https://davidwalsh.name/git-hook-npm-install-package-json-modified

changed_files="$(git diff -r --name-only ORIG_HEAD HEAD)";

# $1 description
# $2 tracked file
# $3 action
check_run() {
    if
        echo "$changed_files" | grep --quiet "$2";
    then
        echo -e "\n > $1: change detected. \n";
        eval "$3";
    fi;
};

check_run "Api package.json" "api/package.json" "cd ./packages/api && npm install";
check_run "Client package.json" "client/package.json" "cd ./packages/client && npm install";

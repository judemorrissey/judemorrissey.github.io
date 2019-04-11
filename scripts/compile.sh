#!/bin/bash

which sass 2>&1 > /dev/null
if [[ $? -ne 0 ]] ; then
    echo "sass does not seem to be installed! use brew install sass/sass/sass OR npm install -g sass"
    exit 1
fi

pushd css/
for filename in $(ls ./*.scss | sed 's/.scss//') ; do
    sass --no-source-map --style=compressed ${filename}.scss ${filename}.css
    git add ${filename}.css
done
popd

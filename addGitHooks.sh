#!/bin/bash

cat <<EOF > .git/hooks/pre-commit  
 grep -rnw src test/* -e '//' && npm test && eslint src test *.js && grep -rnw src test/* -e '//'| wc -l;  
if [ \$? != 0 ]; then 
echo "fix the error";
    exit 1
fi
EOF

chmod +x .git/hooks/pre-commit  


cat <<EOF > .git/hooks/pre-push  
npm run lint 
if [ \$? != 0 ]; then 
    exit 1
fi
EOF


chmod +x .git/hooks/pre-push  
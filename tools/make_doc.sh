#! /bin/bash

SCRIPT=`dirname $0`/..
BASE=`pwd -P`/$SCRIPT
SRC=$BASE/scripts/ts
DOCTMP=$BASE/doc/tmp
DESTSRC=$DOCTMP/js
DESTDOC=$DOCTMP/src
JSDOC=$BASE/doc/jsdoc

rm -rf $DESTSRC
rm -rf $DESTDOC
rm -rf $JSDOC
mkdir -p $DESTSRC
mkdir -p $DESTDOC
mkdir -p $JSDOC
tsc $SRC/*.ts --outDir $DESTSRC

node -e "require('$BASE/tools/class_parser.js'); classParser.makeJSDoc('$SRC/', '$DESTSRC/', '$DESTDOC/');"

jsdoc $DESTDOC/*.js -d $JSDOC


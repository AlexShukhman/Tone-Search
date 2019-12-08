echo Installing Python dependencies
cd ./python

echo "Which pip command do you use? (pip or pip3)"
read pipversion

echo "Installing the following dependencies using $pipversion:"
cat requirements.txt
echo "Is that okay? [Y/n]"
read okay

if [ "$okay" != "${okay#[Nn]}" ]
then
    echo "Exiting..."
    exit 0
else 
    echo "Installing..."
fi

$pipversion install -r requirements.txt

echo "Installing node modules..."
cd ../functions
npm install
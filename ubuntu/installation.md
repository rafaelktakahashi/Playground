## Get Latest Version of Applications in Ubuntu

Tips for getting the most recent versions of various applications in Ubuntu. Most of these can be installed with `sudo apt-get install`, but that may result in an outdated version. Check the version index to see which version of each software you get in your Uubntu version.  
__Note__: Starting from Ubuntu 18.04, `sudo apt-get update` is ran automatically after each `sudo add-apt-repository`, and doesn't have to be done manually.  

### Version Index
Check here if you need / want to install a later version than is available in the repository.  
|Name      |14.04LTS |16.04LTS  |17.10     |18.04LTS  |
|:---:     |:---:    |:---:     |:---:     |:---:     |
|Git       |1.9.1-1  |2.7.4-0   |2.14.1-1  |2.17.1-1  |
|Curl      |7.35.0-1 |7.47.0-1  |7.55.1-1  |7.58.0-2  |
|Wget      |1.15-1   |1.17.1-1  |1.19.1-3  |1.19.4-1  |
|Maven     |3.0.5-1  |3.3.9-3   |3.5.0-6   |3.5.2-2   |
|Tmux      |1.8-5    |2.1-3     |2.5.3     |2.6-3     |
|Node      |1.3.10   |3.5.2-0   |3.5.2-0   |3.5.2-0   |
|Python    |2.7.5-5  |2.7.11-1  |2.7.14-2  |2.7.15-1  |
|Python3   |3.4.0-0  |3.5.1-3   |3.6.3-0   |3.6.5-3   |
|Vim       |7.4.052-1|7.4.1689-3|8.0.0197-4|8.0.1453-4|
|Emacs*    |24.3     |24.5      |25.2      |25.2      |
|Java**    |1.7-51   |1.8-56    |1.8-59    |1.10-63   |
*Metapackage, installs either emacs24 or emacs25
**default-jre and default-jdk packages
 
#### Git
`sudo add -apt-repository -y ppa:git-core/ppa`  
`sudo apt-get update`  
`sudo apt-get install git -y`  

#### Curl
`wget https://curl.haxx.se/download/curl-7.60.0.tar.gz`  
(check latest version at https://curl.haxx.se)  
`tar -xvf curl-7.60.0.tar.gz`  
`cd curl-7*`  
`./configure`  
`make`  
`sudo make install`  

#### Java 8 (OracleJDK)
The command `sudo apt-get install default-jdk` installs OpenJDK. To get OracleJDK instead:  
`sudo add-apt-repository ppa:webupd8team/java`  
`sudo apt-get update`  
`sudo apt-get install oracle-java8-installer`  
#### Java 10 (OracleJDK)
`sudo add-apt-repository ppa:linuxuprising/java`  
`sudo apt-get update`  
`sudo apt-get install oracle-java10-installer`  
#### Java 11 (OpenJDK)
`sudo apt-get install openjdk-11-jdk`  

#### Apache Maven
Get a Maven tarball. Then,  
`sudo tar xzvf apache-maven-<tab> /usr/local`  
Then put a link to the executable in /usr/local/bin:  
`sudo ln -s /usr/local/apache<tab>/bin/mvn /usr/local/bin/mvn`  

#### SqlDeveloper
Get a zip from the official website, then install it to /usr/local/bin:  
`sudo mv sqldeveloper*.zip /usr/local/bin`  
`cd /usr/local`  
`sudo unzip sqldeveloper-<tab>`  
`sudo chmod +x /usr/local/sqldeveloper/sqldeveloper.sh /usr/local/bin/sqldeveloper`  
`sudo rm /usr/local/sqldeveloper*.zip` (optional, you can keep the zip, too)  
Then edit the file /usr/local/sqldeveloper/sqldeveloper.sh so that it contains the following:  
`#!/bin/bash`  
`cd /usr/local/sqldeveloper/sqldeveloper/bin && bash sqldeveloper $*`  
Now, SQL Developer can be launched using the command `sqldeveloper`. The first time, it may query for the path to the Java JDK; find it with:  
`readlink -f $(which javac)`  
Generally it should be at /usr/lib/jvm.  

#### Tmux
Build from source:  
__Note__: Install these packages first: __git__, __automake__, __build-essential__, __pkg-config__, __libevent-dev__, __libncurses5-dev__.  
`git clone https://github.com/tmux/tmux.git /tmp/tmux`  
`cd /tmp/tmux`  
`sh autogen.sh`  
`./configure && make`  
`sudo make install`  
`cd -`  
`rm -fr /tmp/tmux`  

#### Docker
You can also find these instructions [at this link](https://docs.docker.com/install/linux/docker-ce/ubuntu/).  
`sudo apt-get remove docker docker-engine docker.io`  
`sudo apt-get install apt-transport-https ca-certificates curl software-properties-common`  
`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`  
`sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`  
`sudo apt-get udpate`  
`sudo apt-get install docker-ce`  

#### Node
Choose a version manager, like n:  
[n](https://github.com/mklement0/n-install):  
`curl -L https://git.io/n-install | bash`  
(nvm is another version manager. Check it out [here](https://github.com/creationix/nvm)).

#### Python 3.7
`sudo add-apt-repository ppa:jonathonf/python-3.7`  
`sudo apt-get update`  
`sudo apt-get install python3.7`  
You should use a version manager if you need many versions. Check out [pyenv](https://github.com/pyenv/pyenv) and [Anaconda](https://www.anaconda.com/download/)

#### Vim
`sudo add-apt-repository ppa:jonathonf/vim`  
`sudo apt update`  
`sudo apt install vim`  
__OR__ install it from source:  
`sudo apt-get install libncurses5-dev libgnome2-dev libgnomeui-dev libgtk2.0-dev libatk1.0-dev libbonoboui2-dev libcairo2-dev libx11-dev libxpm-dev libxt-dev python-dev python3-dev ruby-dev lua5.1 lua5.1-dev libperl-dev git`  
`sudo apt-get build-dep vim`  
`git clone https://github.com/vim/vim.git`  
`cd vim`  
`./configure --with-features=huge --enable-gui=auto`  
(remove --enable-gui if you don't want gVim)  
`make`  
`sudo make install`  
`make clean`  
`make distclean`  
Make sure you're using Vim from /usr/local/bin/vim instead of /usr/bin/vim.

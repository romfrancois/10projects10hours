async function getGHProfile(username) {
    const url = `https://api.github.com/users/${username}`;

    const results = await fetch(url);
    const userInfo = await results.json();


    // console.log('userInfo: ', userInfo);

    return ({
        name: userInfo.name,
        bio: userInfo.bio,
        profilePic: userInfo.avatar_url,
        repos: userInfo.public_repos,
        following: userInfo.following,
        followers: userInfo.followers,
    });
}

function displayProfile(profile) {
    const ghprofile = document.getElementById('ghprofile');

    ghprofile.innerHTML = "";

    // LEFT
    const divLeft = document.createElement("div");
    divLeft.classList.add("left");

    const profilePic = document.createElement("img");
    profilePic.classList.add("profilePic");
    profilePic.src = profile.profilePic;

    divLeft.appendChild(profilePic);

    // RIGHT
    const divRight = document.createElement("div");
    divRight.classList.add("right");

    const nameLabel = document.createElement("label");
    nameLabel.classList.add("name");
    nameLabel.innerText = profile.name;

    const bioLabel = document.createElement("label");
    bioLabel.classList.add("bio");
    bioLabel.innerText = profile.bio;

    // METRICS
    const divMetrics = document.createElement("div");
    divMetrics.classList.add("metrics");
    
    // REPOS
    const divRepos = document.createElement("div");
    divRepos.classList.add("repos");
    const iRepos = document.createElement("i");
    iRepos.classList.add("far");
    iRepos.classList.add("fa-folder");
    const labelRepos = document.createElement("label");
    labelRepos.classList.add("repos");
    labelRepos.innerText = profile.repos;
    divRepos.appendChild(iRepos);
    divRepos.appendChild(labelRepos);
    
    // FOLLOWING
    const divFollowing = document.createElement("div");
    divFollowing.classList.add("following");
    const iFollowing = document.createElement("i");
    iFollowing.classList.add("fas");
    iFollowing.classList.add("fa-user-plus");
    const labelFollowing = document.createElement("label");
    labelFollowing.classList.add("following");
    labelFollowing.innerText = profile.following;
    divFollowing.appendChild(iFollowing);
    divFollowing.appendChild(labelFollowing);

    // FOLLOWERS
    const divFollowers = document.createElement("div");
    divFollowers.classList.add("followers");
    const iFollowers = document.createElement("i");
    iFollowers.classList.add("fa");
    iFollowers.classList.add("fa-users");
    const labelFollowers = document.createElement("label");
    labelFollowers.classList.add("followers");
    labelFollowers.innerText = profile.followers;
    divFollowers.appendChild(iFollowers);
    divFollowers.appendChild(labelFollowers);

    divMetrics.appendChild(divRepos);
    divMetrics.appendChild(divFollowing);
    divMetrics.appendChild(divFollowers);

    divRight.appendChild(nameLabel);
    divRight.appendChild(bioLabel);
    divRight.appendChild(divMetrics);

    ghprofile.appendChild(divLeft);
    ghprofile.appendChild(divRight);
}

function debug() {
    console.log('**DEBUG**');
    getGHProfile('florinpop17').then((profile) => {
        console.log('userInfo: ', profile);
        displayProfile(profile);
    });
    // getGHProfile('florinpop17');
}

// debug();


async function handleSearchInput(e) {
    e.preventDefault();
    
    const searchInput = document.getElementById('searchInput');
    const searchItem = searchInput.value;

    if (searchItem.length > 0) {
        const movies = await getGHProfile(searchItem);
        displayProfile(movies);
    }
}

const searchInput = document.getElementsByTagName('form')[0];
searchInput.addEventListener('submit', handleSearchInput);
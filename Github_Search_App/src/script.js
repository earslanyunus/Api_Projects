'use strict'
const parentdiv = document.querySelector('.m-body')
const input = document.querySelector('.user-input')
const form = document.querySelector('.input-form')
const name = document.querySelector('.pp-paragraph-1')
const username = document.querySelector('.pp-paragraph-2')
const followers = document.querySelector('#followers')
const following = document.querySelector('#following')
const repoCount = document.querySelector('#repocount')
const locationText = document.querySelector('#location-text')
const twitterText = document.querySelector('#twitter-text')
const biotext = document.querySelector('#bio-text')
const tarih = document.querySelector('#tarih')
let image =document.querySelector('.img-pp')




const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];



let userData

const getData = async (username) =>{
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json();
    userData = data
}

const updateUi = () =>{
    for (let userDataKey in userData) {
        if (userData[userDataKey] == null){
            userData[userDataKey] = ''
        }

    }
    image.setAttribute('src',`${userData.avatar_url}`)
    name.textContent = userData.name
    username.textContent = `@${userData.login}`
    biotext.textContent = userData.bio
    followers.textContent = userData.followers
    following.textContent = userData.following
    repoCount.textContent = userData.public_repos
    locationText.textContent = userData.location
    twitterText.textContent = `@${userData.twitter_username}`
    twitterText.setAttribute('href',`https://twitter.com/${userData.twitter_username}`)
    const year = userData.created_at.slice(0,4)
    const gitmonth = month[(Number(userData.created_at.slice(5,7)))-1]
    const day = userData.created_at.slice(8,10)
    tarih.textContent = `Joined ${day} ${gitmonth} ${year}`
}


form.addEventListener('submit',
    evt => {
        evt.preventDefault()
        const inputValue = input.value

        const update = async () => {
            await getData(inputValue);


            if (!(userData.message == 'Not Found')){
            await updateUi()
            await parentdiv.classList.toggle('active')
            if (document.querySelector('.error-box')){
                document.querySelector('.error-box').remove()
            }

            }

            if (userData.message == 'Not Found'){
                const errordiv =  `<div class="error-box">Not Found User!!</div>`
                parentdiv.insertAdjacentHTML('beforeend',errordiv)
        }

        }
        update()

    })


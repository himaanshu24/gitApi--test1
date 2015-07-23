$(document).ready( function() {



    var gitAPI = 'https://api.github.com/';
    var gitRepoSearch = 'search/repositories?q='
    // $('.c-fetch-git-info').on('click', function() {
    //     var gitRepo = $('.c-git-repo').val();
    //     var findGitRepo = gitAPI + gitRepoSearch + gitRepo;
    //
    //     // Assign handlers immediately after making the request,
    //     // and remember the jqxhr object for this request
    //     var jqxhr = $.getJSON( findGitRepo, function(json) {
    //         console.log( json.items );
    //         $('.c-gitSelect')[0].innerHTML = '<option>DDD</option>';
    //     }).fail(function() {
    //         console.log( "error" );
    //     });
    //
    //     // Set completion function for the request above
    //     jqxhr.complete(function() {
    //         console.log( "complete" );
    //     });
    //
    //
    // });

    // Get all the files in a sprint
    var getAllTheFileFormAllBranch = function(gitSha) {
        // TODO: hardcoded for now -- need to be changed
        // gitSha = '454c7dd82528559c862a44d5692b5a842b822eaa';
        $.ajax({
            url: 'https://api.github.com/repos/himanshuk-optimus/my-first-github/git/trees/'+gitSha+'?recursive=1',
            head: 'Accept: application/api.github.VERSION.raw',
            success: function(results, xhr)
            {
                console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                results.tree.map( function(currentValue) {

                    // if(currentValue.type === 'tree') {
                    //     console.log('Folder = > ' + currentValue.path);
                    //     getAllTheFileFormAllBranch(currentValue.sha);
                    // } else {
                    //     // console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
                    //     console.log(currentValue.path);
                    // }
                    console.log(currentValue.path);


                });
            }
        });
    };
getAllTheFileFormAllBranch('454c7dd82528559c862a44d5692b5a842b822eaa');

    // Get the numbe of "TODO" in each file in a branch
    var getNumberOfToDos = function(username, repoName, branchName) {
        // TODO: hardcoded for now -- need to be changed
        branchName = 'Sprint1-code-review';
        $.ajax({
            url: 'https://raw.githubusercontent.com/' + username + '/' + repoName + '/' + branchName + '/chapter/vince-camuto.htm',
            head: 'Accept: application/api.github.VERSION.raw',
            success: function(results, xhr)
            {
                // console.log(results.match(/TODO/g).length);
            }
        });
    };

    var getBranchsGithubRepository = function(username, repoName) {
        $.ajax({
            url: 'https://api.github.com/repos/' + username + '/' + repoName + '/git/refs',
            dataType: 'jsonp',
            success: function(results, xhr)
            {
                var content = results.data.content;
                var branchName;
                var $options = [];
                var $table = [];
                var gitSha;
                // console.log(results.data instanceof Array);
                // console.log(results.data);

                results.data.map( function(currentValue) {
                    if (currentValue.ref.indexOf('refs/heads') > -1) {
                        // console.log(currentValue.object.sha);
                        gitSha = currentValue.object.sha;
                        // console.log(currentValue.ref);
                        branchName  = currentValue.ref.split('/').pop();
                        $table.push('<div class=""><span class="">' + currentValue.ref + '</span><br><span class="">' + currentValue.object.url + '</span></div>');
                        $options.push('<option>' + branchName + '</option>');
                        // getAllTheFileFormAllBranch(gitSha);
                        // getNumberOfToDos(username, repoName, branchName);
                    }
                });
                $('.c-gitSelect')[0].innerHTML = $options.join('');
                $('.c-git-table')[0].innerHTML = $table.join('');

            }
        });



    };



    var getListOfFilesInGithubRepository = function() {
        var username = 'himanshuk-optimus';
        var repoName = 'UI_Induction';
        getBranchsGithubRepository(username, repoName);




    };


    getListOfFilesInGithubRepository();


});

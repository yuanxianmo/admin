<template>
        <div id="app-body">
            <aside-menu :links='asideLinks'></aside-menu>
            <router-view></router-view>
        </div>
    </template>
    <style>
    </style>
    <script>
        ({
            computed: {
                asideLinks: function () {
                    return [{
                            link: "/artists",
                            name: "设计师列表",
                            exact: this.$route.meta.group=='artists' ? false : true,
                            permission: "artists_list"
                        },
                        {
                            link: "/artists/works",
                            name: "设计师作品列表",
                            permission: "artists_works_list"
                        }
                    ]
                }
            }
        })
    </script>
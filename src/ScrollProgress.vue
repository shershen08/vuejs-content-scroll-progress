<template>
    <div v-bind:class="classes">
        <div class="vue-csp-indicator" :style="fullStyle"></div>
    </div>
</template>

<script>
    var scrollContainer;
    const minSize = 1;
    export default {
        name: "content-scroll-progress",
        props:  {
            spy: {
                type: String,
                default: null
            },
            color: {
                type: String,
                default: ''
            },
            extraClass: {
                type: String,
                default: ''
            }
        },
        methods: {
            checkChildren : function ( childrenList ) {
                //first run
                if(childrenList.length && this.childrenArrayLength === 0){
                    this.childrenHeight = this.iterateChildren(childrenList);
                    this.childrenArrayLength = childrenList.length;
                }
                //assume that child elements size wasn't changed
                if(childrenList.length === this.childrenArrayLength){
                    return this.childrenHeight;
                }
            },
            iterateChildren: function ( childrenList ) {
                var summ = 0;
                for ( var i = 0; i < childrenList.length; i++ ) {
                    var childElHeight = childrenList[ i ].getBoundingClientRect().height;
                    if ( childElHeight >= 0 ) summ += childElHeight;
                }
                return summ;
            },
            handleScroll: function ( e ) {
                let top = scrollContainer.scrollTop + scrollContainer.getBoundingClientRect().height;
                let bottom = this.childrenHeight || this.checkChildren( scrollContainer.children );
                let ratio = ( top / bottom ) * 100 ;
                let result = (parseInt(ratio) >= 100 ? 100 : parseInt(ratio));

                this.fullStyle = `width:${(result || minSize)}%;
                                  background-color:${this.colorStyle};`;
            }
        },
        data() {
            return {
                fullStyle: 0,
                colorStyle:'',
                classes: 'vue-csp-wrapper',
                childrenArrayLength:0,
                childrenHeight:0
            };
        },
        mounted: function () {
            if ( this.spy ) {
                scrollContainer = document.querySelectorAll( this.spy )[ 0 ];
            } else {
                console.error('No scroll container provided');
                throw new Error();
            }
            scrollContainer.addEventListener('scroll', this.handleScroll, false);
            
            //following props colud have some validation
            if(this.color) this.colorStyle = this.color; 
            if(this.extraClass) this.classes += ' ' + this.extraClass;
        },
         beforeDestroy () {
           scrollContainer.addEventListener('scroll', this.handleScroll);
        }
    };
</script>

<style lang="sass">
    .vue-csp-wrapper {
        position: fixed;
        top: 100px;
        height: 4px;
        background:transparent;
        width: 100%;
        z-index: 10000;
    }
    .vue-csp-indicator {
        width: 0%;
        background: #fc0;
        height: 4px;
        -webkit-transition: width .3;
        -moz-transition: width .3;
        transition: width .3;
    }
</style>
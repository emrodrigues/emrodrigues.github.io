new Vue({
    el: '#app',
    data: {
        running: false,
        playerHP: 100,
        enemyHP: 100,
        esp: 5,
        cura: 2,
        logs: []
    },
    computed: {
        hasResult(){
            return this.playerHP == 0 || this.enemyHP == 0;
        }
    },
    methods: {
        startGame() {
            this.playerHP = 100;
            this.enemyHP = 100;
            this.running = true;
            this.esp = 5;
            this.cura = 2;
            this.logs = [];
        },

        attack(especial) {
            if(especial) {
                if(this.esp > 0) {
                    this.hurt('enemyHP', 5, 10, true, 'Jogador', 'Inimigo', 'player');
                    this.esp--;
                }
                else {
                    this.registerLog('Ataque especial falhou (sem mana!).', 'fail');
                }
            }
            else this.hurt('enemyHP', 5, 10, false, 'Jogador', 'Inimigo', 'player');
        
            if(this.enemyHP > 0)
                this.hurt('playerHP', 7, 12, false, 'Inimigo', 'Jogador', 'enemy');
        },

        hurt(who, min, max, especial, soucer, target, cls){
            const plus = especial ? 5 : 0;
            const hurt = this.getRandom(min + plus, max + plus);
            this[who] = Math.max(this[who] - hurt, 0);

            this.registerLog(`${soucer} atacou ${target} causando ${hurt + plus} de dano.`, cls);
        },

        hurtAndHeal(){
            if (this.cura <= 0) 
                this.registerLog('Cura falhou (não há mais itens de cura!).', 'fail');
            else {
                this.heal(15, 25);
                this.cura--;
            }

            this.hurt('playerHP', 7, 12, false, 'Inimigo', 'Jogador', 'enemy');
        }

        ,
        heal(min, max) {
            const heal = this.getRandom(min, max);
            this.playerHP = Math.min(this.playerHP + heal, 100);
            this.registerLog(`Jogador recuperou ${heal} de vida.`, 'cura');
        },

        getRandom(min, max) {
            const value = Math.random() * (max - min) + min;
            return Math.round(value);
        },

        registerLog(text, cls) {
            this.logs.unshift({text, cls});
        }
    },

    watch: {
        hasResult(value){
            if (value) this.running = false;
        }
    }
});
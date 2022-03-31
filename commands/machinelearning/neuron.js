module.exports = {
    name: 'neuron',
    description: 'learns stuff',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const uid = require("cuid");
        neuronlist = [];
        function Neuron() {
            neuron = {
                id:uid(),
                bias:bias == undefined ? Math.random() * 2 - 1 : bias,
                incoming:{
                    neurons:{},
                    weights:{}
                }, 
                outgoing:{
                    neurons:{},
                    weights:{}
                },
                _output:0,
                output:0,
                error,
                connect: function(neuron2,weight){
                    neuron.outgoing.neurons[neuron2.id] = neuron2;
                    neuron2.incoming.neurons[neuron.id]=neuron;
                    neuron.outgoing.weights[neuron2.id] = neuron2.incoming.weights[neuron.id] = weight == undefined ? Math.random() * 2 - 1 : weight;

                }, 
                activate: function(input){
                    const self = neuron;
                    function sigmoid(x){
                        return 1 / (1 + Math.exp(-x));
                    function _sigmoid(x) {
                        return sigmoid(x) * (1 - sigmoid(x))
                    } // f'(x) = f(x) * (1 - f(x))
        
                    }
                }
            }

            this.id = uid(); // ID
            this.bias = bias == undefined ? Math.random() * 2 - 1 : bias; // this.bias ∈ ℝ && -1 < this.bias < 1

            // Incoming Connections
            this.incoming = {
                neurons: {}, // new Map()
                weights: {} // new Map()
            }
            // Outgoing Connections
            this.outgoing = {
                neurons: {}, // new Map()
                weights: {} // new Map()
            }

            this._output; // f'(x)
            this.output; // f(x)
            this.error; // E'(f(x))    // Code here...
            this.connect = function(neuron, weight) {
                this.outgoing.neurons[neuron.id] = neuron;
                neuron.incoming.neurons[this.id] = this;
                this.outgoing.weights[neuron.id] = neuron.incoming.weights[this.id] = weight == undefined ? Math.random() * 2 - 1 : weight; // weight ∈ ℝ && -1 < weight < 1
            }
            this.activate = function(input) {
                const self = this;

                function sigmoid(x) {
                    return 1 / (1 + Math.exp(-x))
                } // f(x) = 1 / (1 + e^(-x))
                function _sigmoid(x) {
                    return sigmoid(x) * (1 - sigmoid(x))
                } // f'(x) = f(x) * (1 - f(x))

                // Input Neurons
                if (input) {
                    this._output = 1; // f'(x)
                    this.output = input; // f(x)
                }
                // Hidden/Output Neurons
                else {
                    // Σ (x • w)
                    const sum = Object.keys(this.incoming.targets).reduce(function(total, target, index) {
                        return total += self.incoming.targets[target].output * self.incoming.weights[target];
                    }, this.bias);

                    this._output = _sigmoid(sum); // f'(x)
                    this.output = sigmoid(sum); // f(x)
                }

                return this.output;
            }
            this.propagate = function(target, rate = 0.3) {
                const self = this;

                //𝛿E /𝛿squash
                const sum = target == undefined ? Object.keys(this.outgoing.targets).reduce(function(total, target, index) {
                    // Δweight
                    self.outgoing.targets[target].incoming.weights[self.id] = self.outgoing.weights[target] -= rate * self.outgoing.targets[target].error * self.output;

                    return total += self.outgoing.targets[target].error * self.outgoing.weights[target];
                }, 0) : this.output - target;

                // 𝛿squash/𝛿sum
                this.error = sum * this._output

                // Δbias
                this.bias -= rate * this.error;

                return this.error;
            }
        }
    },
};
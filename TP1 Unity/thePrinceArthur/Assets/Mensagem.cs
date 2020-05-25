using System.Collections;
using System.Collections.Generic;
using System.Numerics;
using UnityEngine;
using UnityEngine.UI;

public class Mensagem : MonoBehaviour
{
    public Text texto;

    [Range(0.1f,10.0f)]public float distancia = 3;

    private GameObject Jogador;

    // Start is called before the first frame update
    void Start()
    {
        texto.enabled = false;
        Jogador = GameObject.FindWithTag("Player");    
    }

    // Update is called once per frame
    void Update()
    {
        if (UnityEngine.Vector3.Distance(transform.position, Jogador.transform.position) < distancia)
        {
            texto.enabled = true;
        }
        else
        {
            texto.enabled = false;
        }
    }
}

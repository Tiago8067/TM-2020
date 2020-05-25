using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Spikes : MonoBehaviour
{
    private PlayerHealth player;

    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerHealth>();
    }

    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.CompareTag("Player"))
        {
            
            player.Damage(5);

            StartCoroutine(player.Knockback(0.02f, 350, player.transform.position));
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
